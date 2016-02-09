class Post < ActiveRecord::Base
	has_one :dash
	validates_uniqueness_of :og_source 
	has_attached_file :usr_image, styles: { medium: "300x300>", thumb: "100x100>" }, default_url: "/images/:style/missing.png"
	validates_attachment_content_type :usr_image, content_type: /\Aimage\/.*\Z/	

	after_initialize :add_source

	def add_source
		if self.og_source == 'change me'
			self.og_source = self.usr_image.url(:medium)
		end
	end

end
