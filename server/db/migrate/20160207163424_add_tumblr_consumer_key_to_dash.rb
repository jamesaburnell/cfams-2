class AddTumblrConsumerKeyToDash < ActiveRecord::Migration
  def change
    add_column :dashes, :tumblr_consumer_key, :string
  end
end
