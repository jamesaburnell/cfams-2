class AddAttachmentUsrImageToPosts < ActiveRecord::Migration
  def self.up
    change_table :posts do |t|
      t.attachment :usr_image
    end
  end

  def self.down
    remove_attachment :posts, :usr_image
  end
end
