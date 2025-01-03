"""empty message

Revision ID: b98e0b1902f1
Revises: ed0ab87008ea
Create Date: 2024-12-09 18:08:38.948820

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'b98e0b1902f1'
down_revision = 'ed0ab87008ea'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('access_package', schema=None) as batch_op:
        batch_op.alter_column('access_type',
               existing_type=sa.VARCHAR(length=7),
               nullable=True)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('access_package', schema=None) as batch_op:
        batch_op.alter_column('access_type',
               existing_type=sa.VARCHAR(length=7),
               nullable=False)

    # ### end Alembic commands ###
