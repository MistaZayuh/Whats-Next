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

  def self.all_user_events
      query = <<-SQL
      SELECT events.*, users.name AS username, users.id AS userid
      FROM invitations
      INNER JOIN users
          on user_id = users.id
      INNER JOIN events
          on event_id = events.id
      GROUP BY events.id, username, userid
      ORDER BY events.date ASC
    SQL

    ActiveRecord::Base.connection.exec_query(query)
  end

  def self.specific_user_events(specificuserid)
      query = <<-SQL
      SELECT events.*, users.name AS username, users.id AS userid
      FROM invitations
      INNER JOIN users
          on user_id = users.id
      INNER JOIN events
          on event_id = events.id
      WHERE user_id = #{specificuserid}
      GROUP BY events.id, username, userid
      ORDER BY events.date ASC
    SQL

    ActiveRecord::Base.connection.exec_query(query)
  end
end
