class AddDashIdToTerm < ActiveRecord::Migration
  def change
    add_column :terms, :dash_id, :integer
  end
end
