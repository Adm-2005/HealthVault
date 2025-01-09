"""empty message

Revision ID: c58695f24c9e
Revises: b689fbde19c8
Create Date: 2024-12-30 19:19:14.970648

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'c58695f24c9e'
down_revision = 'b689fbde19c8'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.add_column(sa.Column('avatar_filename', sa.String(length=255), nullable=True))
        batch_op.drop_column('avatar_path')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.add_column(sa.Column('avatar_path', sa.VARCHAR(length=255), autoincrement=False, nullable=True))
        batch_op.drop_column('avatar_filename')

    # ### end Alembic commands ###