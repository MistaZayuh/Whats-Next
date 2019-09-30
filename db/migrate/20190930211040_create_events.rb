class CreateEvents < ActiveRecord::Migration[5.2]
  def change
    create_table :events do |t|
      t.string :name
      t.string :location
      t.datetime :date
      t.text :description
      t.string :image
      t.boolean :open
      t.integer :max_attendees

      t.timestamps
    end
  end
end
