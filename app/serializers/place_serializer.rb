class PlaceSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :address, :city, :state, :country, :zipcode, :reviews

  def reviews
    output = []
    object.reviews.each do |review|
      output << ReviewSerializer.new(review)
    end
    output
  end

end
