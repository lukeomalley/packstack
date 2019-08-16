# frozen_string_literal: true

class PacksController < ApplicationController
  def index
    render json: Pack.all
  end

  def show
    render json: Pack.find(params[:id])
  end

  def create
    pack = Pack.new(pack_params)
    if pack.save!
      render json: pack
    else
      render json: { error: 'try again next time pal' }
    end
  end

  def update
    pack = Pack.find(params[:id])
    pack.update(pack_params)
    render json: pack
  end

  def destroy
    Pack.destroy(params[:id])
  end

  private

  def pack_params
    params.require(:packs).permit(:id, :name, :description, :image_url, :category, :user_id)
  end
end
