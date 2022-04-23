"""Add city table

Revision ID: 96dfc07259e3
Revises: 9e76e10b7227
Create Date: 2022-04-23 10:04:42.716365

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = '96dfc07259e3'
down_revision = '9e76e10b7227'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.execute(sa.schema.CreateSequence(sa.schema.Sequence('Cities_Id_seq')))
    op.create_table('Cities',
                    sa.Column('Id', sa.BigInteger(), server_default=sa.text('nextval(\'"Cities_Id_seq"\')'),
                              nullable=False),
                    sa.Column('NameEn', sa.Text(), nullable=False),
                    sa.Column('NameUa', sa.Text(), nullable=False),
                    sa.Column('Lat', sa.Numeric(), nullable=False),
                    sa.Column('Lng', sa.Numeric(), nullable=False),
                    sa.PrimaryKeyConstraint('Id', name='idx_PK_Cities')
                    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.execute(sa.schema.DropSequence(sa.schema.Sequence('Cities_Id_seq')))
    op.drop_table('Cities')
    # ### end Alembic commands ###