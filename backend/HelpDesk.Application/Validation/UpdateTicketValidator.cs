using FluentValidation;
using HelpDesk.Application.Dtos;

namespace HelpDesk.Application.Validation;

public class UpdateTicketValidator : AbstractValidator<UpdateTicketRequest>
{
    public UpdateTicketValidator()
    {
        RuleFor(x => x.Title).MaximumLength(200);
        RuleFor(x => x.Description).MaximumLength(4000);
    }
}