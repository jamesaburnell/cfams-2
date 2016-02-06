class AddTwitConsumerSecretToDash < ActiveRecord::Migration
  def change
    add_column :dashes, :twit_consumer_secret, :string
  end
end
