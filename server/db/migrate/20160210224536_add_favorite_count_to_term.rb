class AddFavoriteCountToTerm < ActiveRecord::Migration
  def change
    add_column :terms, :favorite_count, :integer, default: 0
  end
end
