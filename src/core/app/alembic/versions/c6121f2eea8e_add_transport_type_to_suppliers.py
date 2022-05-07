"""Add transport type to suppliers

Revision ID: c6121f2eea8e
Revises: 841e44d933ee
Create Date: 2022-05-07 09:11:38.923389

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = 'c6121f2eea8e'
down_revision = '841e44d933ee'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('Suppliers', sa.Column('TransportType', sa.Integer(), server_default='1', nullable=False))
    op.add_column('Suppliers', sa.Column('TransportTypeOther', sa.Text(), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('Suppliers', 'TransportTypeOther')
    op.drop_column('Suppliers', 'TransportType')
    # ### end Alembic commands ###