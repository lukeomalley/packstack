# frozen_string_literal: true

class ViewsController < ApplicationController
    def create
        view = View.new(view_params)
        if view.save!
            render json: view
        else
            render json: { error: 'Something went wrong. Try again.' }
        end
    end

    def view_params
        params.require(:view).permit(:result, :card_id, :user_id)
    end
end
