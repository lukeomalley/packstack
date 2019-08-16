# frozen_string_literal: true

class View < ApplicationRecord
  belongs_to :user, required: true
  belongs_to :card, required: true
end
