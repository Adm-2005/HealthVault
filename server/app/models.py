# package/library imports
import datetime
import sqlalchemy as sa 
from flask import url_for
import sqlalchemy.orm as so
from typing import Optional, List
from datetime import datetime, timezone
from sqlalchemy.inspection import inspect
from werkzeug.security import generate_password_hash, check_password_hash

# application imports
from app import db

class DictMixin(object):
    def get_user_defined_attrs(self):
        mapper = inspect(self.__class__)
        return [prop.key for prop in mapper.attrs]
    
    def to_dict(self, **kwargs):
        fields = self.get_user_defined_attrs() 
        data = {}
        for field in fields:
            data[field] = getattr(self, field)

        return data

    def from_dict(self, data, **kwargs):
        fields = self.get_user_defined_attrs()
        for field in fields:
            if field in data:
                setattr(self, field, data[field])
        if kwargs['new_user']:
            self.set_password(data['password'])

class PaginatedAPIMixin(object):
    @staticmethod
    def to_collection_dict(query, page, per_page, endpoint, **kwargs):
        resources = db.paginate(query, page=page, per_page=page, error_out=False)

        data = {
            'items': [item.to_dict() for item in resources.items],
            '_meta': {
                'page': page,
                'per_page': per_page,
                'total_pages': resources.pages,
                'total_items': resources.total
            },
            '_links': {
                'self': url_for(endpoint, page=page, per_page=per_page, **kwargs),
                'prev': url_for(endpoint, page=page+1, per_page=per_page, **kwargs) if resources.has_next else None,
                'next': url_for(endpoint, page=page-1, per_page=per_page, **kwargs) if resources.has_prev else None
            }
        }

        return data

class User(DictMixin, PaginatedAPIMixin, db.Model):
    """Model that maps to 'users' table in database."""

    __tablename__ = "users"

    id: so.Mapped[int] = so.mapped_column(sa.Identity(), primary_key=True)
    username: so.Mapped[str] = so.mapped_column(sa.String(100), unique=True, index=True)
    email: so.Mapped[str] = so.mapped_column(sa.String(255), unique=True, index=True)
    first_name: so.Mapped[Optional[str]] = so.mapped_column(sa.String(50)) 
    last_name: so.Mapped[Optional[str]] = so.mapped_column(sa.String(50))
    role: so.Mapped[str] = so.mapped_column(sa.String(7), nullable=False)
    password_hash: so.Mapped[str] = so.mapped_column(sa.VARCHAR(255))
    created_at: so.Mapped[datetime] = so.mapped_column(default=lambda: datetime.now(timezone.utc))

    patient: so.Mapped[Optional['Patient']] = so.relationship('Patient', back_populates='user', uselist=False)
    doctor: so.Mapped[Optional['Doctor']] = so.relationship('Doctor', back_populates='user', uselist=False)

    def __repr__(self):
        return f"User(id={self.id}, name={self.first_name + " " + self.last_name}, username={self.username})"
    
    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

class Patient(PaginatedAPIMixin, DictMixin, db.Model):
    """Model that maps to 'patients' table in database."""

    __tablename__ = 'patients'

    id: so.Mapped[int] = so.mapped_column(sa.Identity(), primary_key=True)
    user_id: so.Mapped[int] = so.mapped_column(sa.ForeignKey(User.id, ondelete='CASCADE'), unique=True, nullable=False)

    user: so.Mapped['User'] = so.relationship('User', back_populates='patient')
    records: so.Mapped[List['HealthRecord']] = so.relationship('HealthRecord', back_populates='patient', cascade="all, delete-orphan")
    accesses_sent: so.Mapped[List['AccessControl']] = so.relationship('AccessControl', back_populates='patient', cascade="all, delete-orphan")

    def __repr__(self):
        return f"Patient(id={self.id}, records={len(self.records)})"
    
    def num_records(self):
        return len(self.records)
    
class Doctor(PaginatedAPIMixin, DictMixin, db.Model):
    """Model that maps to 'doctors' table in database."""
  
    __tablename__ = 'doctors'

    id: so.Mapped[int] = so.mapped_column(sa.Identity(), primary_key=True)
    user_id: so.Mapped[int] = so.mapped_column(sa.ForeignKey(User.id, ondelete='CASCADE'), index=True, nullable=False, unique=True)
    specialization: so.Mapped[Optional[str]] = so.mapped_column(sa.String(100))
    license_number: so.Mapped[str] = so.mapped_column(sa.String(50), unique=True, index=True) 

    user: so.Mapped['User'] = so.relationship('User', back_populates='doctor')
    health_records: so.Mapped[List['HealthRecord']] = so.relationship('HealthRecord', back_populates='doctor', cascade="all, delete-orphan")
    accesses_received: so.Mapped[List['AccessControl']] = so.relationship('AccessControl', back_populates='doctor', cascade="all, delete-orphan")

    def __repr__(self):
        return f"Doctor(id={self.id}, license_number={self.license_number})"
    
class HealthRecord(PaginatedAPIMixin, DictMixin, db.Model):
    """Model that maps to 'health_records' table in database."""
    
    __tablename__ = 'health_records'

    id: so.Mapped[int] = so.mapped_column(sa.Identity(), primary_key=True)
    patient_id: so.Mapped[int] = so.mapped_column(sa.ForeignKey(Patient.id, ondelete='CASCADE'), index=True, nullable=False)
    doc_id: so.Mapped[int] = so.mapped_column(sa.ForeignKey(Doctor.id, ondelete='SET NULL'), index=True, nullable=True)
    title: so.Mapped[str] = so.mapped_column(sa.String(100))
    record_date: so.Mapped[datetime.date] = so.mapped_column(sa.Date())
    file_type: so.Mapped[str] = so.mapped_column(sa.String(10))
    file_url: so.Mapped[str] = so.mapped_column(sa.String(255), unique=True)
    upload_date: so.Mapped[datetime] = so.mapped_column(default=lambda:datetime.now(timezone.utc))
    notes: so.Mapped[Optional[str]] = so.mapped_column(sa.Text())

    patient: so.Mapped[Patient] = so.relationship('Patient', back_populates='records')
    doctor: so.Mapped[Optional[Doctor]] = so.relationship('Doctor', back_populates='health_records')
    
    health_record_access_controls = so.relationship('HealthRecordAccessControl', back_populates='health_record', cascade="all, delete-orphan", overlaps="health_records")
    access_controls = so.relationship('AccessControl', secondary='health_record_access_control', back_populates='health_records', overlaps="health_record_access_controls")

    def __repr__(self):
        return f"Record(id={self.id}, uploaded_on={self.upload_date}, file_type={self.file_type})"
    
class AccessControl(PaginatedAPIMixin, DictMixin, db.Model):
    """Model that maps to 'access_control' table in database."""

    __tablename__ = 'access_control'

    id: so.Mapped[int] = so.mapped_column(sa.Identity(), primary_key=True)
    patient_id: so.Mapped[int] = so.mapped_column(sa.ForeignKey(Patient.id, ondelete='CASCADE'), index=True, nullable=False)
    doc_id: so.Mapped[int] = so.mapped_column(sa.ForeignKey(Doctor.id, ondelete='CASCADE'), index=True, nullable=True)   
    qrcode_url: so.Mapped[Optional[str]] = so.mapped_column(sa.String(255))
    access_granted: so.Mapped[bool] = so.mapped_column(sa.Boolean(), default=False)
    access_date: so.Mapped[datetime] = so.mapped_column(default=lambda: datetime.now(timezone.utc))

    patient: so.Mapped['Patient'] = so.relationship('Patient', back_populates='accesses_sent')
    doctor: so.Mapped['Doctor'] = so.relationship('Doctor', back_populates='accesses_received')
    
    access_record_access_controls = so.relationship('HealthRecordAccessControl', back_populates='access_control', cascade="all, delete-orphan", overlaps="access_controls")
    health_records = so.relationship('HealthRecord', secondary='health_record_access_control', back_populates='access_controls', overlaps="access_record_access_controls")

    def __repr__(self):
        return f"Access(id={self.id}, date={self.access_date})"
    
class HealthRecordAccessControl(db.Model):
    __tablename__ = 'health_record_access_control'

    hr_id: so.Mapped[int] = so.mapped_column(sa.Identity(), sa.ForeignKey(HealthRecord.id, ondelete='CASCADE'), primary_key=True)
    ac_id: so.Mapped[int] = so.mapped_column(sa.Identity(), sa.ForeignKey(AccessControl.id, ondelete='CASCADE'), primary_key=True)
    granted_at: so.Mapped[datetime] = so.mapped_column(default=lambda: datetime.now(timezone.utc))

    health_record = so.relationship('HealthRecord', back_populates='health_record_access_controls', overlaps="access_controls,health_records")
    access_control = so.relationship('AccessControl', back_populates='access_record_access_controls', overlaps="access_controls,health_records")

    def __repr__(self):
        return f"HealthRecordAccessControl(health_record_id={self.health_record_id}, access_control_id={self.access_control_id})"