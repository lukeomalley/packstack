# frozen_string_literal: true

class PacksController < ApplicationController
  def index
    packs = Pack.all
    render json: packs.to_json(packs_serializer_options)
  end

  def show
    render json: Pack.find(params[:id]).to_json(pack_serializer_options)
  end

  def create
    pack = Pack.new(pack_params)
    if pack.save!
      render json: pack.to_json(pack_serializer_options)
    else
      render json: { error: 'try again next time pal' }
    end
  end

  def update
    pack = Pack.find(params[:id])
    pack.update(pack_params)
    render json: pack.to_json(pack_serializer_options)
  end

  def destroy
    Pack.destroy(params[:id])
  end

  private

  def pack_params
    params.require(:packs).permit(:name, :description, :image_url, :category, :user_id)
  end

  def packs_serializer_options
    {
      include: {
        user: { only: %i[name image_url] }
      },
      except: [:updated_at]
    }
  end

  def pack_serializer_options
    {
      include: {
        user: { only: %i[name image_url] },
        cards: { only: %i[question answer is_multi options image_url id] }
      },
      except: [:updated_at]
    }
  end
end
