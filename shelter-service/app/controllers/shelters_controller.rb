class SheltersController < ApplicationController
  # before_action :set_shelter, only: [:show, :update, :destroy]

  # GET /shelters
  def index
    @shelters = Shelter.all
    render json: @shelters
  end

  # GET /shelters/1
  def show
    render json: @shelter
  end

  # POST /shelters
  def create
    @shelter = Shelter.new(shelter_params)

    if @shelter.save
      render json: @shelter, status: :created, location: @shelter
    else
      render json: @shelter.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /shelters/1
  def update
    @shelter = Shelter.find(params[:id])
    if @shelter.present?
      if @shelter.update(shelter_params)
        render json: @shelter
      else
        render json: @shelter.errors, status: :unprocessable_entity
      end
    end
  end

  # DELETE /shelters/1
  def destroy
    @shelter = Shelter.find(params[:id])
    if @shelter.present?
      @shelter.destroy
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_shelter
      @shelter = Shelter.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def shelter_params
      params.require(:shelter).permit(:name, :description, :email, :phone_number, :address)
    end
end
