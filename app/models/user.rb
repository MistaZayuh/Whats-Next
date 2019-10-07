# frozen_string_literal: true

class User < ActiveRecord::Base
  has_many :invitations
  has_many :events, through: :invitations
  has_many :comments, dependent: :destroy
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  include DeviseTokenAuth::Concerns::User

  def self.events_index

      query = <<-SQL
      SELECT events.*, users.name AS username
      FROM invitations
      INNER JOIN users
          on user_id = users.id
      INNER JOIN events
          on event_id = events.id
      GROUP BY events.id, username
      ORDER BY events.date DESC
    SQL
    
    ActiveRecord::Base.connection.exec_query(query)


  end
end
