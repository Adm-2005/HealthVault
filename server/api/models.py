# package/library imports
from datetime import datetime, date
import sqlalchemy as sa 
from flask import url_for
import sqlalchemy.orm as so
from typing import Optional, List
from datetime import datetime, timezone
from sqlalchemy.inspection import inspect
from werkzeug.security import generate_password_hash, check_password_hash

# application imports
from api import db

class DictMixin(object):
    """Generic serialization and de-serialization methods"""
    def get_user_defined_attrs(self):
        mapper = inspect(self.__class__)
        return [prop.key for prop in mapper.attrs]
    
    def to_dict(self, **kwargs):
        fields = self.get_user_defined_attrs() 
        data = {}
        for field in fields:
            value = getattr(self, field)
            
            if field == 'password_hash':
                continue

            if isinstance(value, list):
                data[field] = [item.to_dict(**kwargs) if hasattr(item, 'to_dict') else item for item in value]
            elif isinstance(value, dict):
                data[field] = {k: v.to_dict(**kwargs) if hasattr(v, 'to_dict') else v for k, v in value.items()}
            elif isinstance(value, (str, int, float, type(None), date, datetime)):
                data[field] = value
            else:
                data[field] = None

        return data

    def from_dict(self, data, **kwargs):
        fields = self.get_user_defined_attrs()
        for field in fields:
            if field in data:
                setattr(self, field, data[field])
        if kwargs.get('new_user'):
            self.set_password(data['password'])

class PaginatedAPIMixin(object):
    """Generic pagination methods"""
    @staticmethod
    def to_collection_dict(query, page, per_page, endpoint, **kwargs):
        resources = db.paginate(query, page=page, per_page=per_page, error_out=False)

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
                'next': url_for(endpoint, page=page+1, per_page=per_page, **kwargs) if resources.has_next else None,
                'prev': url_for(endpoint, page=page-1, per_page=per_page, **kwargs) if resources.has_prev else None
            }
        }

        return data

class User(DictMixin, PaginatedAPIMixin, db.Model):
    """Maps to 'users' table in database."""

    __tablename__ = "users"

    id: so.Mapped[int] = so.mapped_column(sa.Identity(), primary_key=True)
    username: so.Mapped[str] = so.mapped_column(sa.String(100), unique=True, index=True)
    email: so.Mapped[str] = so.mapped_column(sa.String(255), unique=True, index=True)
    role: so.Mapped[str] = so.mapped_column(sa.String(7), nullable=False)
    first_name: so.Mapped[Optional[str]] = so.mapped_column(sa.String(50)) 
    last_name: so.Mapped[Optional[str]] = so.mapped_column(sa.String(50))
    city: so.Mapped[Optional[str]] = so.mapped_column(sa.String(100))
    country: so.Mapped[Optional[str]] = so.mapped_column(sa.String(100))
    bio: so.Mapped[Optional[str]] = so.mapped_column(sa.Text())
    avatar_url: so.Mapped[Optional[str]] = so.mapped_column(sa.String(255))
    password_hash: so.Mapped[str] = so.mapped_column(sa.VARCHAR(255))
    created_at: so.Mapped[datetime] = so.mapped_column(default=lambda: datetime.now(tz=timezone.utc))

    patient: so.Mapped[Optional['Patient']] = so.relationship('Patient', back_populates='user', uselist=False)
    doctor: so.Mapped[Optional['Doctor']] = so.relationship('Doctor', back_populates='user', uselist=False)

    def __repr__(self):
        return f"User(id={self.id}, name={self.first_name + " " + self.last_name}, username={self.username})"
    
    def set_avatar(self, avatar_dir, size=256):
        from api.user.utils import generate_avatar # to avoid circular imports
        self.avatar_url = generate_avatar(self.first_name, self.last_name, avatar_dir, size)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

class Patient(PaginatedAPIMixin, DictMixin, db.Model):
    """Maps that maps to 'patients' table in database."""

    __tablename__ = 'patients'

    id: so.Mapped[int] = so.mapped_column(sa.Identity(), primary_key=True)
    user_id: so.Mapped[int] = so.mapped_column(sa.ForeignKey(User.id, ondelete='CASCADE'), unique=True, nullable=False)

    user: so.Mapped['User'] = so.relationship('User', back_populates='patient')
    records: so.Mapped[Optional[List['HealthRecord']]] = so.relationship('HealthRecord', back_populates='patient', cascade="all, delete-orphan")
    accesses_sent: so.Mapped[Optional[List['AccessControl']]] = so.relationship('AccessControl', back_populates='patient', cascade="all, delete-orphan", foreign_keys="AccessControl.patient_id")
    accesses_received: so.Mapped[Optional[List['AccessControl']]] = so.relationship('AccessControl', back_populates='rec_patient', cascade="all, delete-orphan", foreign_keys="AccessControl.rec_patient_id")

    def __repr__(self):
        return f"Patient(id={self.id}, user_id={self.user_id}, records={len(self.records)})"
    
    def num_records(self):
        return len(self.records)
    
class Doctor(PaginatedAPIMixin, DictMixin, db.Model):
    """Maps to 'doctors' table in database."""
  
    __tablename__ = 'doctors'

    id: so.Mapped[int] = so.mapped_column(sa.Identity(), primary_key=True)
    user_id: so.Mapped[int] = so.mapped_column(sa.ForeignKey(User.id, ondelete='CASCADE'), index=True, nullable=False, unique=True)
    specialization: so.Mapped[Optional[str]] = so.mapped_column(sa.String(100))
    license_number: so.Mapped[str] = so.mapped_column(sa.String(50), unique=True, index=True) 
    affiliation: so.Mapped[Optional[str]] = so.mapped_column(sa.String(255))

    user: so.Mapped['User'] = so.relationship('User', back_populates='doctor')
    accesses_received: so.Mapped[Optional[List['AccessControl']]] = so.relationship('AccessControl', back_populates='doctor', cascade="all, delete-orphan")

    def __repr__(self):
        return f"Doctor(id={self.id}, license_number={self.license_number})"
    
class HealthRecord(PaginatedAPIMixin, DictMixin, db.Model):
    """Maps to 'health_records' table in database."""

    __tablename__ = 'health_records'

    id: so.Mapped[int] = so.mapped_column(sa.Identity(), primary_key=True)
    patient_id: so.Mapped[int] = so.mapped_column(sa.ForeignKey(Patient.id, ondelete='CASCADE'), index=True, nullable=False)
    title: so.Mapped[str] = so.mapped_column(sa.String(100))
    record_date: so.Mapped[datetime.date] = so.mapped_column(sa.Date())
    file_type: so.Mapped[str] = so.mapped_column(sa.String(10))
    file_url: so.Mapped[str] = so.mapped_column(sa.String(255), unique=True)
    upload_date: so.Mapped[datetime] = so.mapped_column(default=lambda: datetime.now(tz=timezone.utc))
    notes: so.Mapped[Optional[str]] = so.mapped_column(sa.Text())

    patient: so.Mapped[Patient] = so.relationship('Patient', back_populates='records')

    health_record_access_controls = so.relationship('HealthRecordAccessControl', back_populates='health_record', cascade="all, delete-orphan", overlaps="health_records")
    access_controls = so.relationship('AccessControl', secondary='health_record_access_control', back_populates='health_records', overlaps="health_record_access_controls", passive_deletes=True)

    def __repr__(self):
        return f"Record(id={self.id}, uploaded_on={self.upload_date}, file_type={self.file_type})"

class AccessControl(PaginatedAPIMixin, DictMixin, db.Model):
    """Maps to 'access_control' table in database."""

    __tablename__ = 'access_control'

    id: so.Mapped[int] = so.mapped_column(sa.Identity(), primary_key=True)
    patient_id: so.Mapped[int] = so.mapped_column(sa.ForeignKey(Patient.id, ondelete='CASCADE'), index=True, nullable=False)
    access_type: so.Mapped[str] = so.mapped_column(sa.String(7), nullable=False) # describes whether access is granted to a doctor or another patient
    doc_id: so.Mapped[int] = so.mapped_column(sa.ForeignKey(Doctor.id, ondelete='CASCADE'), index=True, nullable=True) # when receiver is doctor
    rec_patient_id: so.Mapped[int] = so.mapped_column(sa.ForeignKey(Patient.id, ondelete='CASCADE'), index=True, nullable=True) # when receiver is patient
    qrcode_url: so.Mapped[Optional[str]] = so.mapped_column(sa.String(255))
    access_granted: so.Mapped[bool] = so.mapped_column(sa.Boolean(), default=False)
    access_date: so.Mapped[datetime] = so.mapped_column(default=lambda: datetime.now(tz=timezone.utc))

    patient: so.Mapped['Patient'] = so.relationship('Patient', back_populates='accesses_sent', foreign_keys=[patient_id])
    doctor: so.Mapped['Doctor'] = so.relationship('Doctor', back_populates='accesses_received')
    rec_patient: so.Mapped['Patient'] = so.relationship('Patient', back_populates='accesses_received', foreign_keys=[rec_patient_id])

    health_record_access_controls = so.relationship('HealthRecordAccessControl', 
                                                    back_populates='access_control', 
                                                    cascade="all, delete-orphan", 
                                                    overlaps="access_controls")
    health_records = so.relationship('HealthRecord', 
                                     secondary='health_record_access_control', 
                                     back_populates='access_controls', 
                                     overlaps="health_record_access_controls")

    def __repr__(self):
        return f"Access(id={self.id}, date={self.access_date})"

class HealthRecordAccessControl(db.Model):
    """Maps to 'health_record_access_control' join table in database."""
    
    __tablename__ = 'health_record_access_control'

    hr_id: so.Mapped[int] = so.mapped_column(sa.Identity(), sa.ForeignKey(HealthRecord.id, ondelete='CASCADE'), primary_key=True)
    ac_id: so.Mapped[int] = so.mapped_column(sa.Identity(), sa.ForeignKey(AccessControl.id, ondelete='CASCADE'), primary_key=True)
    granted_at: so.Mapped[datetime] = so.mapped_column(default=lambda: datetime.now(tz=timezone.utc))

    health_record = so.relationship('HealthRecord', back_populates='health_record_access_controls', overlaps="access_controls,health_records")
    access_control = so.relationship('AccessControl', back_populates='health_record_access_controls', overlaps="access_controls,health_records")

    def __repr__(self):
        return f"HealthRecordAccessControl(health_record_id={self.hr_id}, access_control_id={self.ac_id})"