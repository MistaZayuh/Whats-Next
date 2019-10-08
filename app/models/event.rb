class Event < ApplicationRecord
  has_many :invitations
  has_many :users, through: :invitations
  has_many :comments, dependent: :destroy

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
end
