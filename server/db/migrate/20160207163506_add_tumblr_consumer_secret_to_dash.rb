class AddTumblrConsumerSecretToDash < ActiveRecord::Migration
  def change
    add_column :dashes, :tumblr_consumer_secret, :string
  end
end
