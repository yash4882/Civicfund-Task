class AllocationsController < ApplicationController
  before_action :authenticate_user!

  def index
    @projects = Project.all
    @existing_allocations = current_user.allocations.index_by(&:project_id)
  end

  def create
    total = 0
    allocations = []

    params[:allocations].each do |project_id, amount|
      amount = amount.to_i
      total += amount

      allocations << Allocation.new(
        user: current_user,
        project_id: project_id,
        amount: amount
      ) if amount > 0
    end

    if total > 1000
      flash[:alert] = "You cannot allocate more than $1000."
      redirect_to allocations_path
    else
      current_user.allocations.destroy_all
      Allocation.import allocations
      redirect_to confirm_allocations_path
    end
  end

  def confirm
    @allocations = current_user.allocations.includes(:project)
  end
end
