require 'wombat'
require 'csv'

begin
 target_url = "https://www.goodreads.com/book/show/41941681-patron-saints-of-nothing"
 # class	MavScraper
 bob = Wombat.crawl do
				 base_url URI.escape(target_url)
				 path "/"
				 rev_likes "xpath=//a[contains(@id,'like_count_review')]", :list
				 rev_date "xpath=//a[@class='reviewDate createdAt right']", :list
				 rev_stars "xpath=//span [contains(@class,'staticStar')][contains(@title,'it')]", :list
			 	 end


			 puts bob.to_yaml
		 CSV.open("reviews.csv", "wb") do |csv|
				index_rev = 0
				bob["rev_date"].each do |rev|
				 	 csv << [bob["rev_date"][index_rev], bob["rev_likes"][index_rev], bob["rev_stars"][index_rev]]
				 	index_rev+=1
				end
			#	puts "Here is my CSV..."
			#	puts csv.to_yaml
	end
end
