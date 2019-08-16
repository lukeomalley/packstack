class PackSerializer
    def initialize(pack_object)
      @pack = pack_object
    end
    def to_serialized_json
      options = 
      {
        :include => {
          :user => {:only =>[:name, :image_url]},
        },
        :except => [:updated_at]
      }
      @pack.to_json(options)
    end
  end
  