class AddTwitConsumerKeyToDash < ActiveRecord::Migration
  def change
    add_column :dashes, :twit_consumer_key, :string
  end
end
