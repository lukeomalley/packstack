# frozen_string_literal: true

class PacksController < ApplicationController
  def index
    render json: Pack.all
  end

  def show
    render json: Pack.find(params[:id])
  end

  def create
    user = User.new(user_params)
    if user.save!
      render json: user
    else
      render json: { error: 'try again next time pal' }
    end
  end

  def update; end

  def destroy; end

  private

  def user_params
    params.require(:user).permit(:name, :image_url)
  end
end
