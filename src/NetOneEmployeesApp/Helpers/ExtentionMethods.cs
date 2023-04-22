using NetOneEmployeesApp.Models;

namespace NetOneEmployeesApp.Helpers
{
  public static class ExtentionMethods
  {
    public static string constantDate = "04/30/2023";
    public static User WithoutPassword(this User user)
    {
      user.Password = null;
      return user;
    }

    public static T GetPropertyValue<T>(object obj, string propName)
    {
      return (T)obj.GetType().GetProperty(propName).GetValue(obj, null);
    }

    public static bool ComparePropertyValues<T>(T oldObj, T newObj, string propName)
    {
      var oldValue = oldObj.GetType().GetProperty(propName).GetValue(oldObj, null);
      var newValue = newObj.GetType().GetProperty(propName).GetValue(newObj, null);

      return oldValue == newValue;
    }

    public static void UpdateEmployeePropertyChange(Employee oldEmployee, Employee newEmployee, string property)
    {
      //update only changed properties
      if (!ComparePropertyValues(oldEmployee, newEmployee, property))
      {
        var typeName = oldEmployee.GetType().GetProperty(property).PropertyType.Name;
        if (typeName == typeof(bool).Name)
        {
          oldEmployee.GetType().GetProperty(property).SetValue(oldEmployee,
            GetPropertyValue<bool>(newEmployee, property), null);
        }
        else if (typeName == typeof(int).Name)
        {
          oldEmployee.GetType().GetProperty(property).SetValue(oldEmployee,
            GetPropertyValue<int>(newEmployee, property), null);
        }
        else
        {
          oldEmployee.GetType().GetProperty(property).SetValue(oldEmployee,
            GetPropertyValue<string>(newEmployee, property), null);
        }
      }
    }
    public static void UpdateContactDetailsPropertyChange(ContactDetails oldCI, ContactDetails newCI, string property)
    {
      if (!ComparePropertyValues(oldCI, newCI, property))
      {
        var typeName = oldCI.GetType().GetProperty(property).PropertyType.Name;
        if (typeName == typeof(bool).Name)
        {
          oldCI.GetType().GetProperty(property).SetValue(oldCI,
            GetPropertyValue<bool>(newCI, property), null);
        }
        else if (typeName == typeof(int).Name)
        {
          oldCI.GetType().GetProperty(property).SetValue(oldCI,
            GetPropertyValue<int>(newCI, property), null);
        }
        else
        {
          oldCI.GetType().GetProperty(property).SetValue(oldCI,
            GetPropertyValue<string>(newCI, property), null);
        }
      }
    }

    public static void UpdateEmploymentDetailsPropertyChange(EmploymentDetails oldEI, EmploymentDetails newEI, string property)
    {
      if (!ComparePropertyValues(oldEI, newEI, property))
      {
        var typeName = oldEI.GetType().GetProperty(property).PropertyType.Name;
        if (typeName == typeof(bool).Name)
        {
          oldEI.GetType().GetProperty(property).SetValue(oldEI,
            GetPropertyValue<bool>(newEI, property), null);
        }
        else if (typeName == typeof(int).Name)
        {
          oldEI.GetType().GetProperty(property).SetValue(oldEI,
            GetPropertyValue<int>(newEI, property), null);
        }
        else
        {
          oldEI.GetType().GetProperty(property).SetValue(oldEI,
            GetPropertyValue<string>(newEI, property), null);
        }
      }
    }

    public static void UpdateEmergencyContactDetailsPropertyChange(EmergencyContactDetails oldECI, EmergencyContactDetails newECI, string property)
    {
      if (!ComparePropertyValues(oldECI, newECI, property))
      {
        var typeName = oldECI.GetType().GetProperty(property).PropertyType.Name;
        if (typeName == typeof(bool).Name)
        {
          oldECI.GetType().GetProperty(property).SetValue(oldECI,
            GetPropertyValue<bool>(newECI, property), null);
        }
        else if (typeName == typeof(int).Name)
        {
          oldECI.GetType().GetProperty(property).SetValue(oldECI,
            GetPropertyValue<int>(newECI, property), null);
        }
        else
        {
          oldECI.GetType().GetProperty(property).SetValue(oldECI,
            GetPropertyValue<string>(newECI, property), null);
        }
      }
    }
  }
}
