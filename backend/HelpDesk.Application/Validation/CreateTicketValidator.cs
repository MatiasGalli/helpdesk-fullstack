using FluentValidation;
using HelpDesk.Application.Dtos;

namespace HelpDesk.Application.Validation;

public class CreateTicketValidator : AbstractValidator<CreateTicketRequest>
{
    public CreateTicketValidator()
    {
        RuleFor(x => x.Title).NotEmpty().MaximumLength(200);
        RuleFor(x => x.Description).NotEmpty().MaximumLength(4000);
    }
}