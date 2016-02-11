# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

# u = User.new(email: "hathbanger.ah@gmail.com", password: "amh05055", password_confirmation: "amh05055")
# u.save

# d = Dash.new(title: "Cats are Assholes", subreddit: "catsareassholes", twit_consumer_key: "eOXa9pCrNa2hmTDBrFnH7yLUMTlNzm39TV8lrGOIVdgiL9ioKF", twit_consumer_secret: 'eOXa9pCrNa2hmTDBrFnH7yLUMTlNzm39TV8lrGOIVdgiL9ioKF', twit_access_token: '2924568200-ZqicVFiUlawjIpjCzWloJj9X5rywRzXBP2QT5ia', twit_access_token_secret: 'IbYoWDPcjQUUeGAFywbwamAuk7ZuHN8i3VsS9QoguIzSI')
# d.save

  Plan.create({
      name: 'Personal',
      price: 20.00,
      interval: 'month',
      stripe_id: '1',
      display_order: 1
    })
