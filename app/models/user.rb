# frozen_string_literal: true

class User < ActiveRecord::Base
  has_many :invitations
  has_many :events, through: :invitations
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  include DeviseTokenAuth::Concerns::User
end
