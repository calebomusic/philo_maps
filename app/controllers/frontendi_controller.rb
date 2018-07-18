class FrontendiController < ApplicationController
  def root
    propositions = Proposition.all
    proposition_map = {}
    propositions.each { |el| proposition_map[el.id] = el.attributes }

    @state = {
      propositions: proposition_map
    }
  end
end
