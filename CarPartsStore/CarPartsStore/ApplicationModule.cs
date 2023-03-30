using Autofac;
using DataLayer;
using DataLayer.Models;
using ServiceLayer;

namespace CarPartsStore;

public class ApplicationModule : Module
{
    protected override void Load(ContainerBuilder builder)
    {
        builder.RegisterType<CarpartsstoreContext>().AsSelf().InstancePerLifetimeScope();
        builder.RegisterType<ItemRepository>().AsImplementedInterfaces().InstancePerLifetimeScope();
        builder.RegisterType<ItemService>().AsImplementedInterfaces().InstancePerLifetimeScope();
    }
}