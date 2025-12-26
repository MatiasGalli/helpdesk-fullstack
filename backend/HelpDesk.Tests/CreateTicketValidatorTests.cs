using HelpDesk.Application.Dtos;
using HelpDesk.Application.Validation;
using HelpDesk.Domain.Entities;
using Xunit;

namespace HelpDesk.Tests;

public class CreateTicketValidatorTests
{
    [Fact]
    public void Invalid_when_title_is_empty()
    {
        var validator = new CreateTicketValidator();

        var req = new CreateTicketRequest(
            Title: "",
            Description: "Desc válida",
            Priority: TicketPriority.Medium,
            AssignedTo: null
        );

        var result = validator.Validate(req);

        Assert.False(result.IsValid);
        Assert.Contains(result.Errors, e => e.PropertyName == "Title");
    }

    [Fact]
    public void Invalid_when_description_is_empty()
    {
        var validator = new CreateTicketValidator();

        var req = new CreateTicketRequest(
            Title: "Título válido",
            Description: "",
            Priority: TicketPriority.Medium,
            AssignedTo: null
        );

        var result = validator.Validate(req);

        Assert.False(result.IsValid);
        Assert.Contains(result.Errors, e => e.PropertyName == "Description");
    }

    [Fact]
    public void Valid_when_request_is_ok()
    {
        var validator = new CreateTicketValidator();

        var req = new CreateTicketRequest(
            Title: "Título válido",
            Description: "Descripción válida",
            Priority: TicketPriority.High,
            AssignedTo: "admin"
        );

        var result = validator.Validate(req);

        Assert.True(result.IsValid);
    }
}