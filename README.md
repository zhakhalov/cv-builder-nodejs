## Rest Api

## Authentication

#### Sign In User

|                     |                                             |
|---------------------|---------------------------------------------|
|Url                  |_/api/auth/signin_                           | 
|Method               |__POST__                                     |
|Request data format  |_JSON_                                       |
|Response data format |_JSON_                                       |
|Request body         |`{ usenrame: {String}, password: {String} }` |
|Response body        |`{ user: {User}, token: {String} }`          |

#### Sign Up User

|                     |                                         |
|---------------------|-----------------------------------------|
|Url                  |_/api/auth/signup_                       | 
|Method               |__POST__                                 |
|Request data format  |_JSON_                                   |
|Response data format |_JSON_                                   |
|Request body         |`{User}`                                 |
|Response body        |`{ user: {User}, token: {String} }`      |


__Authorization header__ 
```
header = 'Bearer ' + token
```

## Users ##

#### Get all users

|                       |                                             |
|-----------------------|---------------------------------------------|
|Url                    |_/api/users_                                 | 
|Method                 |__GET__                                      |
|Request data format    |_JSON_                                       |
|Response data format   |_JSON_                                       |
|Request body           |`{ usenrame: {String}, password: {String} }` |
|Response body          |`{ user: {User}, token: {String} }`          |
|Requires authorization |__NO__                                       |

#### Create user

|                       |               |
|-----------------------|---------------|
|Url                    |_/api/users_   | 
|Method                 |__POST__       |
|Request data format    |_JSON_         |
|Response data format   |_JSON_         |
|Request body           |`{User}`       |
|Response body          |`{User}`       |
|Requires authorization |__YES__        |

#### Update user

|                       |             |
|-----------------------|-------------|
|Url                    |_/api/users_ | 
|Method                 |__PUT__      |
|Request data format    |_JSON_       |
|Response data format   |_JSON_       |
|Request body           |`{User}`|
|Response body          |`{User}`|
|Requires authorization |__YES__      |


## User data schema 

```
Skill: {
  name: { type:String, required: true },
  level: { type:String ,required: true }
};

Exp: {
  startAt: { type: Date, default: Date.now },
  endAt: { type: Date, default: Date.now },
  company: { type:String ,required: true },
  position: { type:String ,required: true }
};

Edu: {
  startAt: { type: Date, default: Date.now },
  endAt: { type: Date, default: Date.now },
  institution: { type:String ,required: true },
  spec: { type:String ,required: true },
  degree: { type:String ,required: true }
};

Lang: {
  name: { type: String, required: true },
  level: { type: String, required: true}
};

User: {
  email: { type: String, required: true},
  password: { type: String },
  firstName: { type: String },
  lastName: { type: String },
  gender: { type:String },
  marital: { type:String },
  tel: { type: String },
  skype: { type: String },
  address: { type: String },
  dateOfBirth: { type: Date },
  objective: { type: String },
  skills: [SkillSchema],
  experience: [ExpSchema],
  education: [EduSchema],
  languages: [LangSchema],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
};
```
#### Application deployed and running at http://cvbuildernodejs-zhakhalov.rhcloud.com/
You can register on this service with any password (it will be hashed)
