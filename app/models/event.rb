class Event < ApplicationRecord
  has_many :invitations, dependent: :destroy
  has_many :users, through: :invitations
  has_many :comments, dependent: :destroy

  def self.specific_event_users(specificeventid)
    query = <<-SQL
    SELECT
    events.id AS eventid, 
    events.date AT TIME ZONE 'UTC',
    invitations.accepted, 
    invitations.organizer, 
    invitations.id, 
    users.name, 
    users.id AS user_id, 
    users.image
    FROM invitations
    INNER JOIN users
        on user_id = users.id
    INNER JOIN events
        on event_id = events.id
    WHERE event_id = #{specificeventid}
    GROUP BY eventid, users.name, users.id, invitations.accepted, invitations.id, invitations.organizer, users.image, events.date
    ORDER BY events.date ASC
    SQL

    ActiveRecord::Base.connection.exec_query(query)
  end

  def self.event_search(search)
    query = <<-SQL
    SELECT 
      events.id,
      events.name AS event_name,
      events.created_at::date AS formatted_date
    FROM events
    WHERE LOWER(name) LIKE LOWER('%#{search}%')
    SQL
    ActiveRecord::Base.connection.exec_query(query)
  end

  def self.specific_event_comments(specificeventid)
    query = <<-SQL
    SELECT comments.*, users.name, users.image
    FROM comments
    INNER JOIN users
        on user_id = users.id
    WHERE event_id = #{specificeventid}
    GROUP BY comments.id, users.name, users.image
    ORDER BY comments.created_at DESC
    SQL

    ActiveRecord::Base.connection.exec_query(query)
  end

  def self.specific_event(specificeventid)
    query = <<-SQL
    SELECT *
    FROM events
    WHERE events.id = #{specificeventid}
    SQL

    ActiveRecord::Base.connection.exec_query(query)
  end

  def self.explore(page)
    query = <<-SQL
    SELECT *
    FROM events
    GROUP BY events.id
    ORDER BY events.date
    OFFSET (#{page} * 30) FETCH NEXT 30 ROWS ONLY
    SQL

    ActiveRecord::Base.connection.exec_query(query)
  end
end
