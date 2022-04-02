arr = ["Apple", "Melon", "Orange"]
new_arr = [*arr, "banana"] # ['Apple', 'Melon', 'Orange', 'banana']
new_arr2 = ["Strawberry", *new_arr] # ['Strawberry', 'Apple', 'Melon', 'Orange', 'banana']
print(arr)
print(new_arr)
print(new_arr2)

person = {"name":"ricepotato", "email":"sukjun402@naver.com"}
new_person = {**person, "phone":"010-123-1234"}
print(person)
print(new_person)
