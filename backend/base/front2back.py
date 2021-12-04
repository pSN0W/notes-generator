def convert_data_to_frontend_friendly(dic):
    """Converts the dictionary generated from serializer into the form
    that our front end wants.

    Args:
        dic ([dictionary]): [Serializer generated dictionary]

    Returns:
        [dictionacy]: [front end friendly dictionary]
    """
    final_dic = {}
    setting_dic = {
        "screen":{},
        "box":{},
        "line":{},
        "text":{},
        "line-hz":{}
    }
    for k,v in dic.items():
        # split the key from "_"
        seperated_attribute = k.split('_')
        
        # If first word is not style then just add the key value to final dictionary
        if seperated_attribute[0]!="style":
            final_dic[k]=v
            
        # If the first word is style then this is a CSS property so make modifications
        else:
            # name of the css attribute will be the third element of seperated_attribute
            css_attribute = seperated_attribute[2]
            
            # the component will be the second element of seperated_attribute
            # add the css_attribute in component and component to setting_dic
            setting_dic[seperated_attribute[1]][css_attribute]=v
        
        # setting["line_hz"] dictionary will be same as setting["line"] except the width 
        # property of later will be equivalent to height property of former 
        for k,v in setting_dic["line"].items():
            if k=="width":
                setting_dic["line-hz"]["height"] = v
            else:
                setting_dic["line-hz"][k] = v
    
    # add setting_dic to final_dic and return it            
    final_dic["settings"] = setting_dic
    return final_dic


def convert_data_to_backend_friendly(dic):
    """Convert the data coming from frontend in a form that can be used by serializer easily
    to update the database

    Args:
        dic ([dictionary]): [JSON data coming from frontend]

    Returns:
        [dictionary]: [Data in the form that can easily be used by serializer]
    """
    final_dic = {}
    setting_dic = dic.get("settings",0) # Checking if "settings" exist in the frontend data
    if setting_dic:
        # if setting exist that iterate through it here k will ve component and v will be dictionary
        for k,v in setting_dic.items():
            # iterate through the dictionary v
            # here ky is css_attribute name while vy is value associated with it
            for ky,vy in v.items():
                # convert it in the form that we are storing them in database
                model_attribute = f"style_{k}_{ky}"
                final_dic[model_attribute] = vy
    
    # for all the other item except shared_with and settings 
    # just add them to the final_dic            
    for k,v in dic.items():
        if k!="settings" and k!="shared_with":
            final_dic[k]=v

    return final_dic