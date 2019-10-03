class Event < ApplicationRecord
  has_many :invitations
  has_many :users, through: :invitations
  has_many :comments, dependent: :destroy
end
