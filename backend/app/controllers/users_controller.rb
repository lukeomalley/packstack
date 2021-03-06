# frozen_string_literal: true

class UsersController < ApplicationController
  def index
    render json: User.all
  end

  def show
    render json: User.find(params[:id])
  end

  def create
    user = User.new(user_params)
    if user.save!
      render json: user
    else
      render json: { error: 'You failed.' }
    end
  end

  def update
    user = User.find(params[:id])
    if user.update(user_params)
      render json: user
    else
      render json: { error: 'You failed.' }
    end
  end

  def destroy
    user = User.find(:id)
    user.destroy
    render json: User.all
  end

  private

  def user_params
    params.require(:user).permit(:name, :image_url)
  end
end
