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
      price: 10.00,
      interval: 'month',
      stripe_id: '1',
      features: ['1 Project', '1 Page', '1 User', '1 Organization'].join("\n\n"),
      display_order: 1
    })

    Plan.create({
      name: 'Team',
      highlight: true, # This highlights the plan on the pricing page.
      price: 30.00,
      interval: 'month',
      stripe_id: '2',
      features: ['3 Projects', '3 Pages', '3 Users', '3 Organizations'].join("\n\n"),
      display_order: 2
    })

    Plan.create({
      name: 'Enterprise',
      price: 100.00, 
      interval: 'month',
      stripe_id: '3', 
      features: ['10 Projects', '10 Pages', '10 Users', '10 Organizations'].join("\n\n"), 
      display_order: 3
    })


    Plan.create({
      name: 'Basic',
      price: 100.00, 
      interval: 'month',
      stripe_id: '4', 
      features: ['10 Projects', '10 Pages', '10 Users', '10 Organizations'].join("\n\n"), 
      display_order: 3
    })
