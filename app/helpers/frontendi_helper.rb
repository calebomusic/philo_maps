module FrontendiHelper
  def to_json_map(array)
    map = {}
    array.each { |el| map[el.id] = el.attributes }
    map
  end
end
