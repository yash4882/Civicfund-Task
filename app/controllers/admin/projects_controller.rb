class Admin::ProjectsController < ApplicationController
  def index
    @projects = Project.left_joins(:allocations)
      .select("projects.*, COALESCE(SUM(allocations.amount), 0) as total_allocated")
      .group("projects.id")
  end
end
