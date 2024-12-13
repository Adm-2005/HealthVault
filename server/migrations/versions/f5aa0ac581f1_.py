"""empty message

Revision ID: f5aa0ac581f1
Revises: e3df53a1b315
Create Date: 2024-12-07 15:17:51.946075

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'f5aa0ac581f1'
down_revision = 'e3df53a1b315'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('health_records', schema=None) as batch_op:
        batch_op.drop_index('ix_health_records_doc_id')
        batch_op.drop_constraint('health_records_doc_id_fkey', type_='foreignkey')
        batch_op.drop_column('doc_id')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('health_records', schema=None) as batch_op:
        batch_op.add_column(sa.Column('doc_id', sa.INTEGER(), autoincrement=False, nullable=True))
        batch_op.create_foreign_key('health_records_doc_id_fkey', 'doctors', ['doc_id'], ['id'], ondelete='SET NULL')
        batch_op.create_index('ix_health_records_doc_id', ['doc_id'], unique=False)

    # ### end Alembic commands ###