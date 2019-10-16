100.times do
  date = rand(Date.civil(2019, 1, 1)..Date.civil(2020, 12, 31))
  event = Event.create(
    name: Faker::Company.name,
    location: Faker::Address.street_name,
    created_at: date,
    updated_at: date,
    )
  end
  
puts "100 Events Seeded"