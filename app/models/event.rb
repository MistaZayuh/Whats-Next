class Event < ApplicationRecord
  has_many :invitations, dependent: :destroy
  has_many :users, through: :invitations
  has_many :comments, dependent: :destroy

  def self.specific_event_users(specificeventid)
    query = <<-SQL
    SELECT events.*, invitations.accepted, invitations.organizer, users.name AS username, users.id AS userid
    FROM invitations
    INNER JOIN users
        on user_id = users.id
    INNER JOIN events
        on event_id = events.id
    WHERE event_id = #{specificeventid}
    GROUP BY events.id, username, userid, invitations.accepted, invitations.organizer
    ORDER BY events.date ASC
    SQL

    ActiveRecord::Base.connection.exec_query(query)
  end
end
