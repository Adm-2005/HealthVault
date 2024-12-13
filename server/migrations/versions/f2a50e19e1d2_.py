"""empty message

Revision ID: f2a50e19e1d2
Revises: f5aa0ac581f1
Create Date: 2024-12-08 16:21:00.378868

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'f2a50e19e1d2'
down_revision = 'f5aa0ac581f1'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('access_control', schema=None) as batch_op:
        batch_op.add_column(sa.Column('access_type', sa.String(length=7), nullable=False))
        batch_op.add_column(sa.Column('rec_patient_id', sa.Integer(), nullable=True))
        batch_op.create_index(batch_op.f('ix_access_control_rec_patient_id'), ['rec_patient_id'], unique=False)
        batch_op.create_foreign_key(None, 'patients', ['rec_patient_id'], ['id'], ondelete='CASCADE')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('access_control', schema=None) as batch_op:
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.drop_index(batch_op.f('ix_access_control_rec_patient_id'))
        batch_op.drop_column('rec_patient_id')
        batch_op.drop_column('access_type')

    # ### end Alembic commands ###