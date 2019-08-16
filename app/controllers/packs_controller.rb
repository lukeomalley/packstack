# frozen_string_literal: true

class PacksController < ApplicationController
  def index
    render json: Pack.all
  end

  def show; end

  def create; end

  def update; end

  def destroy; end
end
