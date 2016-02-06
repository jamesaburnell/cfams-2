class AddGiphySearchToDash < ActiveRecord::Migration
  def change
    add_column :dashes, :giphy_search, :string
  end
end
