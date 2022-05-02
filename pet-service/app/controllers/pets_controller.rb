require "faraday"
require 'json'
require 'faraday/net_http'
Faraday.default_adapter = :net_http
class PetsController < ApplicationController
  # before_action :set_pet, only: [:show, :update, :destroy]
  before_action :authorized, except: [:health,:shelter_pets,:show,:index]
  @shelter_service =nil
  def initialize
    @shelter_service = Faraday.new(
      url: 'http://shelter:3000',
      headers: {'Content-Type' => 'application/json'}
    )
  end
  
  # GET /pets
  def index
    @pets = Pet.all
    render json: @pets
  end

  def health
    render true
  end

  def shelter_pets
    pets = ActiveRecord::Base.connection.execute("
    select p.*
    from pets p
    where p.shelter_id =  #{ActiveRecord::Base.sanitize_sql(params[:shelter_id].to_i)}
    limit 1 
  ")
  render json: pets
  end

  # GET /pets/1
  def show
    render json: Pet.find(params[:id].to_i)
  end

  # POST /pets
  def create


    response = @shelter_service.get("/shelters/user",{},{'Authorization'=>"Bearer #{@token}"})
    
    if response.status == 200 
      @pet = Pet.new(pet_params)
      res = JSON.parse response.body
      @shelter = res[0]
      if @shelter
        @pet.shelter_id = @shelter['id']
      else
        render json: {message: 'Not A Shelter'}, status: :unauthorized
        return
      end

      if @pet.save
        render json: @pet, status: :created, location: @pet
      else
        render json: @pet.errors, status: :unprocessable_entity
      end
    else
      render json: {message:'Something Went Wrong'},status: response.status
    end
   
  end

  # PATCH/PUT /pets/1
  def update
    @pet = Pet.find(params[:id])
    response = @shelter_service.get("/shelters/user",{},{'Authorization'=>"Bearer #{@token}"})
    if response.status == 200
      res = JSON.parse response.body
      @shelter = res[0]
      if @shelter
      else
        render json: {message: 'Not A Shelter'}, status: :unauthorized
        return
      end

      if @pet.present?
        if @pet.update(pet_params)
          render json: @pet
        else
          render json: @pet.errors, status: :unprocessable_entity
        end
      end
    end
   
  end

  # DELETE /pets/1
  def destroy
    @pet = Pet.find(params[:id])

    if @pet.present?
      @pet.destroy
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_pet
      @pet = Pet.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def pet_params
      params.require(:pet).permit(:name, :description, :age,:image_url, :troubling_history, :animal_type, :animal_category, :male_only, :female_only, :inspection_required)
    end
end
