"""update

Revision ID: c4b2f39ffe9a
Revises: 4423d2a6afa1
Create Date: 2024-05-06 22:20:19.647013

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'c4b2f39ffe9a'
down_revision = '4423d2a6afa1'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('canna_gears',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('gear_type', sa.String(), nullable=True),
    sa.Column('brand', sa.String(), nullable=True),
    sa.Column('model', sa.String(), nullable=True),
    sa.Column('purchase_date', sa.String(), nullable=True),
    sa.Column('price', sa.Integer(), nullable=True),
    sa.Column('rating', sa.Integer(), nullable=True),
    sa.Column('pic', sa.String(), nullable=True),
    sa.Column('notes', sa.String(), nullable=True),
    sa.Column('visible', sa.Boolean(), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.drop_table('canna_gear')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('canna_gear',
    sa.Column('id', sa.INTEGER(), nullable=False),
    sa.Column('user_id', sa.INTEGER(), nullable=True),
    sa.Column('gear_type', sa.VARCHAR(), nullable=True),
    sa.Column('brand', sa.VARCHAR(), nullable=True),
    sa.Column('model', sa.VARCHAR(), nullable=True),
    sa.Column('purchase_date', sa.VARCHAR(), nullable=True),
    sa.Column('price', sa.INTEGER(), nullable=True),
    sa.Column('rating', sa.INTEGER(), nullable=True),
    sa.Column('pic', sa.VARCHAR(), nullable=True),
    sa.Column('notes', sa.VARCHAR(), nullable=True),
    sa.Column('visible', sa.BOOLEAN(), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.drop_table('canna_gears')
    # ### end Alembic commands ###