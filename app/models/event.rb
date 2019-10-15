class Event < ApplicationRecord
  has_many :invitations, dependent: :destroy
  has_many :users, through: :invitations
  has_many :comments, dependent: :destroy

  def self.specific_event_users(specificeventid)
    query = <<-SQL
    SELECT events.*, events.id AS eventid, invitations.accepted, invitations.organizer, invitations.id, users.name AS username, users.id AS user_id, users.image AS userimage
    FROM invitations
    INNER JOIN users
        on user_id = users.id
    INNER JOIN events
        on event_id = events.id
    WHERE event_id = #{specificeventid}
    GROUP BY eventid, username, users.id, invitations.accepted, invitations.id, invitations.organizer, userimage
    ORDER BY events.date ASC
    SQL

    ActiveRecord::Base.connection.exec_query(query)
  end

  def self.event_search(column, search)
    find_by_sql(["
    SELECT 
      events.id,
      events.name AS event_name,
      events.created_at::date AS formatted_date
    FROM events
    WHERE LOWER(name) LIKE LOWER(?);
    ", "%#{search}%"])
  end

  def self.specific_event_comments(specificeventid)
    query = <<-SQL
    SELECT comments.*, users.name, users.image
    FROM comments
    INNER JOIN users
        on user_id = users.id
    WHERE event_id = #{specificeventid}
    GROUP BY comments.id, users.name, users.image
    ORDER BY comments.created_at ASC
    SQL

    ActiveRecord::Base.connection.exec_query(query)
  end
end
